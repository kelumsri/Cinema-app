    package com.example.cinema_app.controller;

    import com.example.cinema_app.modal.User;
    import com.example.cinema_app.repository.UserRepository;
    import com.example.cinema_app.service.AuthenticationService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.ResponseEntity;
    import org.springframework.stereotype.Repository;
    import org.springframework.web.bind.annotation.*;

    @RestController
    @CrossOrigin(origins = "*")
    @RequestMapping("/api/users")
    public class UserController {

        private final UserRepository userRepository;
        private final AuthenticationService authenticationService;


        @Autowired
        public UserController(UserRepository userRepository , AuthenticationService authenticationService) {
            this.userRepository = userRepository;
            this.authenticationService = authenticationService;
        }

        @PutMapping ("/{id}")
        public ResponseEntity<?> updateUserDetails (@PathVariable ("id") Integer id, @RequestBody User updatedUser) {
            User existingUser = userRepository.findById(id).orElse(null);
            if(existingUser == null) {
                return ResponseEntity.notFound().build();
            }

            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setUserName(updatedUser.getUserName());

            User savedUser=userRepository.save(existingUser);

            return ResponseEntity.ok(savedUser);
        }
    }
