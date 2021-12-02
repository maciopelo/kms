from rest_framework.exceptions import AuthenticationFailed,ValidationError


from users.models import User
import jwt

def authenticate_user(request):
    
    token = request.COOKIES.get('jwt')

    print(token)
    if not token:
        raise AuthenticationFailed("błąd uwierzytelniania")

    try:
        payload = jwt.decode(token, 'secret_key', algorithms=['HS256'])

    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed("błąd uwierzytelniania")
    
    return User.objects.get(pk=payload['id'])


