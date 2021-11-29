from rest_framework.exceptions import AuthenticationFailed,ValidationError
from users.models import User
import jwt

def authenticate_user(request):
    
    print(request.COOKIES)
    token = request.COOKIES.get('jwt')

    if not token:
        raise AuthenticationFailed("błąd uwierzytelniania")

    try:
        payload = jwt.decode(token, 'secret_key', algorithms=['HS256'])

    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed("błąd uwierzytelniania")
    
    return User.objects.get(pk=payload['id'])