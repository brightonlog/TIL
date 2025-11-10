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
  def __str__(self):
    return f'{self.pk}번 환자 {self.name}'

class Reservation(models.Model):
  # 의사가 이 병원 그만두면 레코드 자체가 없어진다는 뜻
  doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)  
  # 환자가 사망하면 레코드 자체가 없어진다는 뜻
  patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
  symptom = models.TextField()
  reserved_at = models.DateTimeField(auto_now_add=True)