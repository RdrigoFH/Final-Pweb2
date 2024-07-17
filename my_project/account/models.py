from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator

class PayModel(models.Model):
    email = models.EmailField(null=True, blank=True)
    name_on_card = models.CharField(max_length=200, null=True, blank=True)
    customer_id = models.CharField(max_length=200, blank=True, null=True)
    card_number = models.CharField(max_length=16, unique=True, null=True, blank=True)
    exp_month = models.CharField(max_length=2, validators=[RegexValidator(r'^\d{0,9}$')], null=True, blank=True)
    exp_year = models.CharField(max_length=4, validators=[RegexValidator(r'^\d{0,9}$')], null=True, blank=True)
    card_id = models.TextField(max_length=100, null=True, blank=True)
    user = models.ForeignKey(User, related_name="stripemodel", on_delete=models.CASCADE, null=True, blank=True)
    address_city = models.CharField(max_length=120, null=True, blank=True)
    address_country = models.CharField(max_length=120, null=True, blank=True)
    address_state = models.CharField(max_length=120, null=True, blank=True)
    address_zip = models.CharField(max_length=6, validators=[RegexValidator(r'^\d{0,9}$')], null=True, blank=True)

    def __str__(self):
        return self.email
class BillingAddress(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    user = models.ForeignKey(User, related_name="billingmodel", on_delete=models.CASCADE, null=True, blank=True)
    phone_number = models.CharField(max_length=10, validators=[RegexValidator(r'^\+?1?\d{9,15}$')], null=False, blank=False)
    pin_code = models.CharField(max_length=6, validators=[RegexValidator(r'^\d{0,9}$')], null=False, blank=False)
    house_no = models.CharField(max_length=300, null=False, blank=False)
    landmark = models.CharField(max_length=120, null=False, blank=False)
    city = models.CharField(max_length=120, null=False, blank=False)
    state = models.CharField(max_length=120, null=False, blank=False)

    def __str__(self):
        return self.name
