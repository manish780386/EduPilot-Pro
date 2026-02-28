from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate

class TeacherRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email','mobile','password']
        extra_kwargs = {'password':{'write_only':True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.role = "teacher"
        user.save()
        return user
    
class TeacherLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self,data):
        user = authenticate(**data)
        if not user:
            raise serializers.ValidationError("Invalid Credentials")

        if user.role != "teacher":
            raise serializers.ValidationError("Only Teacher Allowed")

        return user