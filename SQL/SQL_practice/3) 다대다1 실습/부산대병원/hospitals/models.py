from django.db import models

# Create your models here.
class Doctor(models.Model):
  name = models.TextField()
  def __str__(self):
    return f'{self.pk}번 의사 {self.name}'
  


# 의사와 환자간의 M:N 관계를 Reservation 모델을 통해 관리할게 ~!
# => throug='Reservation'
class Patient(models.Model):
  doctors = models.ManyToManyField(Doctor, through='Reservation')
  name = models.TextField()