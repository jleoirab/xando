package com.jleoirab.xando.api.v1.controller;

import com.jleoirab.xando.api.v1.resources.ApiError;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * Created by jleoirab on 2021-02-12
 */
class GlobalControllerAdviceTest {
    // Static variable declaration

    // System under test
    private GlobalControllerAdvice sut;

    // Collaborators

    // Helpers
    @BeforeEach
    void setup() {
        sut = new GlobalControllerAdvice();
    }

    @Test
    void test_Given_ApiException_When_HandleApiException_then_ShouldReturnCorrectResponseEntity() {
        String errorMessage = "Error message";
        HttpStatus status = HttpStatus.BAD_REQUEST;

        ResponseEntity<ApiError> response = sut.handleApiException(new ApiException(status, errorMessage));
        ApiError error = response.getBody();

        assertNotNull(error);
        assertEquals(errorMessage, error.getMessage());
        assertEquals(status, response.getStatusCode());
    }
}


