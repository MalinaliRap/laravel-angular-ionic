<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    //

   public function register(Request $request)
   {
      $validatedData = $request->validate([
         'name' => 'required|max:55',
         'email' => 'email|required|unique:users',
         'password' => 'required|confirmed'
      ]);

      $validatedData['password'] = bcrypt($request->password);

      $user = User::create($validatedData);

      $accessToken = $user->createToken('authToken')->accessToken;

      return response([ 'user' => $user, 'access_token' => $accessToken]);
   }

   public function login(Request $request)
   {
      $loginData = $request->validate([
         'email' => 'email|required',
         'password' => 'required'
      ]);

      if (!auth()->attempt($loginData)) {
         return response(['message' => 'Credenciais Inválidas'], 401);
      }

      $accessToken = auth()->user()->createToken('authToken')->accessToken;

      return response(['user' => auth()->user(), 'access_token' => $accessToken]);

   }

   public function logout(Request $request){
      if (Auth::check()) {
         $user = Auth::user()->token();
         $user->revoke();
         return response(['message' => 'logout realizado com sucesso']);
      }

      return response(['message' => 'Erro ao realizar logout']);
   }
}
