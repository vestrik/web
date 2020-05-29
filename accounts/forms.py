from django import forms

class RegForm(forms.Form):
    logf = forms.CharField(max_length=20)
    passf = forms.CharField(max_length=20)
    emailf = forms.CharField(max_length=20)
    namef = forms.CharField(max_length=50)
    snamef = forms.CharField(max_length=50)
