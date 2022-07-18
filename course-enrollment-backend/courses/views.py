#from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from courses.models import Course
from courses.serializers import CourseSerializer
from rest_framework.exceptions import APIException
from rest_framework.permissions import IsAuthenticated
# Create your views here.


class UserCourseViewSet(viewsets.ViewSet):  # prefix /user
    permission_classes = (IsAuthenticated, )

    def get_user(self):
        # TODO: to be replaced by real user authen
        return authenticate(username='admin', password='admin')
    # 1 http method (CRUD)? READ -> GET
    # 2 url? /user/courses
    # 3 client input ? http header: auth token
    # 4 response status code and body？200 + a list of courses
    # 列出课程

    @action(methods=['GET'], detail=False)
    def courses(self, request):  # url即名字
        # TODO: get user and connect DB
        user = request.user
        enrolled_courses = user.courses.all()
        serializer = CourseSerializer(instance=enrolled_courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    # 添加课程
    # 1 http method (CRUD)? READ -> POST
    # 2 url? /user/course
    # 3 client input ? course name, in URL: /user/course/{course_name}/
    # 4 response status code and body？204

    @action(methods=['POST'], detail=False, url_path="course/(?P<course_name>[\w\s]+)")
    def course(self, request, **kwargs):
        user = request.user
        course_name = kwargs['course_name']
        course = Course.objects.filter(course_name=course_name).first()
        if course is None:
            raise APIException(detail='Course does not exist')
        if user in course.user.all():
            raise APIException(detail='Already enrolled')
        course.user.add(user)
        # TODO: connect DB
        return Response({}, status=status.HTTP_204_NO_CONTENT)
    # 删除课程

    @course.mapping.delete
    def withdraw_course(self, request, **kwargs):
        course_name = kwargs['course_name']
        user = request.user
        course = Course.objects.filter(course_name=course_name).first()
        if course is None:
            raise APIException(detail='Course does not exist')
        if user not in course.user.all():
            raise APIException(detail='Course has not been enrolled yet')
        # TODO: connect DB
        course.user.remove(user)
        return Response({}, status=status.HTTP_204_NO_CONTENT)


class CourseViewSet(viewsets.ViewSet):  # prefix /user

    # 1 http method (CRUD)? READ -> GET
    # 2 url? /user/courses
    # 3 client input ? http header: auth token
    # 4 response status code and body？200 + a list of courses
    # 所有课程
    @action(methods=['GET'], detail=False)
    def courses(self, request):  # url即名字
        # TODO: get user and connect DB
        courses = Course.objects.all()
        serializer = CourseSerializer(instance=courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
