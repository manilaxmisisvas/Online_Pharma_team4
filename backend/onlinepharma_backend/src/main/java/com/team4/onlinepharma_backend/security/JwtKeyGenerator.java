//package com.team4.onlinepharma_backend.security;
//
//import io.jsonwebtoken.security.Keys;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.io.Encoders;
//
//public class JwtKeyGenerator {
//    public static void main(String[] args) {
//        var key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
//        String base64Key = Encoders.BASE64.encode(key.getEncoded());
//        System.out.println("Base64 JWT Secret = " + base64Key);
//    }
//}
