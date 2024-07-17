import stripe
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from account.models import StripeModel, OrderModel
from datetime import datetime

stripe.api_key="your secret key here"

def save_card_in_db(cardData, email, cardId, customer_id, user):
    StripeModel.objects.create(
        email=email,
        customer_id=customer_id,
        card_number=cardData["number"],
        exp_month=cardData["exp_month"],
        exp_year=cardData["exp_year"],
        card_id=cardId,
        user=user,
    )

class TestStripeImplementation(APIView):
    def post(self, request):
        test_payment_process = stripe.PaymentIntent.create(
            amount=120,
            currency='inr',
            payment_method_types=['card'],
            receipt_email='yash@gmail.com'
        )
        return Response(data=test_payment_process, status=status.HTTP_200_OK)
    
class CheckTokenValidation(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response("Token is Valid", status=status.HTTP_200_OK)
    
class CreateCardTokenView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        tarjeta_invalida = False
        data = request.data
        email = request.data["email"]
        guardar_tarjeta = request.data["save_card"]

        informacion_tarjeta = data["number"]
        tarjeta_cliente = informacion_tarjeta[slice(12, 16)] # solo los ultimos 4 dígitos de la tarjeta

        # verificando usuario valido (se verificara el correo electrónico asociado con la tarjeta)
        datos_clientes = stripe.Customer.list().data
        datos_usuarios = []
        for cliente in datos_clientes:
            tarjeta_cliente = cliente.sources.data[0].last4
            datos_usuarios.append({"user": {"card_num": tarjeta_cliente, "card_holder": cliente.email}})

        for usuario in datos_usuarios:
            info_usuario = usuario["user"]
            tarjeta_usuario = info_usuario["card_num"]
            email_usuario = info_usuario["card_holder"]

            if tarjeta_usuario == tarjeta_cliente:
                if email_usuario != email:                
                    return Response({ 
                        "detail": "Su dirección de correo electrónico no corresponde con la tarjeta proporcionada." }, 
                        status=status.HTTP_400_BAD_REQUEST)      

        try:
            tokenStripe = stripe.Token.create(
                card = {
                "number": data["number"],
                "exp_month": data["exp_month"],
                "exp_year": data["exp_year"],
                "cvc": data["cvc"]
                },
            )

        except stripe.error.CardError as e:
            mensaje_error = e.user_message # segun la documentación de Stripe
            return Response({ "detail": mensaje_error}, status=status.HTTP_400_BAD_REQUEST)

        
        except stripe.error.APIConnectionError:            
            return Response({ "detail": "Error de red, no se pudo establecer una nueva conexion."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)              
        
        datos_clientes = stripe.Customer.list(email=email).data

        if len(datos_clientes) == 0:
            # crear cliente en Stripe (nos proporcionara el id del cliente en la respuesta)
            cliente = stripe.Customer.create(
                email = request.data["email"],
                description="Mi nuevo cliente"
            )
        else:
            cliente = datos_clientes[0]
            mensaje = "El cliente ya existe"

            tarjeta_actual = cliente.sources.data[0].last4 # contiene el numero de la tarjeta (últimos cuatro dígitos)
            mes_exp_actual = cliente.sources.data[0].exp_month
            año_exp_actual = cliente.sources.data[0].exp_year

            tarjeta_recibida = data["number"]
            ultimos4_tarjeta_recibida = tarjeta_recibida[-4:]
            mes_exp_recibido = data["exp_month"]
            año_exp_recibido = data["exp_year"]

            # comparando los últimos 4 dígitos de la tarjeta proporcionada por el usuario con los últimos 4 dígitos de la tarjeta presente en Stripe
            if tarjeta_actual != ultimos4_tarjeta_recibida or mes_exp_actual != mes_exp_recibido or año_exp_actual != año_exp_recibido:
                tarjeta_invalida = True
        
        if tarjeta_invalida:         
            return Response({"detail": "Detalles de la tarjeta inválidos."}, status=status.HTTP_400_BAD_REQUEST)

        else:
            # creando una tarjeta en Stripe (validada también por el token de Stripe)
            crear_tarjeta_usuario = stripe.Customer.create_source(
                cliente["id"],
                source=tokenStripe.id,
            )

            # el id de la tarjeta se generó en este punto

            if guardar_tarjeta:
                try:
                    save_card_in_db(data, email, crear_tarjeta_usuario.id, cliente["id"], request.user)
                    mensaje = {"customer_id": cliente["id"], "email": email, "card_data": crear_tarjeta_usuario}
                    return Response(mensaje, status=status.HTTP_200_OK)
                except:
                    return Response({ 
                        "detail": "Tarjeta ya en uso, por favor desmarque la opción de guardar tarjeta o seleccione una tarjeta de la lista de tarjetas guardadas."},
                        status=status.HTTP_400_BAD_REQUEST)
            else:
                try:
                    mensaje = {"customer_id": cliente["id"], "email": email, "card_data": crear_tarjeta_usuario}
                    return Response(mensaje, status=status.HTTP_200_OK)
                except:
                    return Response({ "detail": "Error de red, por favor verifique su conexión a Internet."})