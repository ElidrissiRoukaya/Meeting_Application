package com.example.online_meeting_application;

import com.example.online_meeting_application.user.User;
import com.example.online_meeting_application.user.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class OnlineMeetingApplication {

    public static void main(String[] args) {
        SpringApplication.run(OnlineMeetingApplication.class, args);
    }


    // Here we are adding some demo users to the system
    @Bean
    public CommandLineRunner commandLineRunner(
            UserService service
    ) {
        return args -> {
            service.register(User.builder()
                    .username("Mohammed")
                    .email("mohamed@mail.com")
                    .password("m123")
                    .build());

            service.register(User.builder()
                    .username("Ahmed")
                    .email("ahmed@mail.com")
                    .password("a123")
                    .build());

            service.register(User.builder()
                    .username("Aymen")
                    .email("aymen@mail.com")
                    .password("an123")
                    .build());
        };
    }
}
