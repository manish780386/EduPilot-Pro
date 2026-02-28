from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TeacherRegisterSerializer, TeacherLoginSerializer

class TeacherRegisterView(APIView):
    def post(self,request):
        serializer = TeacherRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg":"Teacher Registered"})
        return Response(serializer.errors)


class TeacherLoginView(APIView):
    def post(self,request):
        serializer = TeacherLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response({"msg":"Login Success"})
        return Response(serializer.errors)