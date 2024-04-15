package com.example.cinema_app.service;

import com.example.cinema_app.modal.AuthenticationResponse;
import com.example.cinema_app.modal.LoginRequest;
import com.example.cinema_app.modal.Token;
import com.example.cinema_app.modal.User;
import com.example.cinema_app.repository.TokenRepository;
import com.example.cinema_app.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final TokenRepository tokenRepository;


    public AuthenticationService(UserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager, TokenRepository tokenRepository) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.tokenRepository = tokenRepository;
    }

    public AuthenticationResponse register(User request){
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUserName(request.getUserName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setRole(request.getRole());
        user = repository.save(user);

        HashMap<String, Object> roleData = new HashMap<>();
        roleData.put("role",request.getRole());

        String jwt = jwtService.generateToken(user,roleData);


        revokeAllTokenByUser(user);

        saveUserToken(jwt, user);

        return new AuthenticationResponse(jwt);
    }

    private void revokeAllTokenByUser(User user) {
        List<Token> validTokenListByUser = tokenRepository.findAllTokenByUser(user.getId());

        if(!validTokenListByUser.isEmpty()){
            validTokenListByUser.forEach(t ->{
                t.setLoggedOut(true);
            });
        }

        tokenRepository.saveAll(validTokenListByUser);
    }


    public AuthenticationResponse authenticate(LoginRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUserName(),
                        request.getPassword()
                )
        );

       User user = repository.findByUserName(request.getUserName()).orElseThrow();
        HashMap<String, Object> roleData = new HashMap<>();
        roleData.put("role",user.getRole());
       String token = jwtService.generateToken(user,roleData);
       saveUserToken(token,user);

       return new AuthenticationResponse(token);
    }

    private void saveUserToken(String jwt, User user) {
        Token token = new Token();
        token.setToken(jwt);
        token.setLoggedOut(false);
        token.setUser(user);
        tokenRepository.save(token);
    }
}
