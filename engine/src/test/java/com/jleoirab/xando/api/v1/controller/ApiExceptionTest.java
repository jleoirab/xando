package com.jleoirab.xando.api.v1.controller;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

/**
 * Created by jleoirab on 2021-02-12
 */
class ApiExceptionTest {
    // Static variable declaration

    // System under test
    private ApiException sut;

    // Collaborators

    // Helpers


    @Test
    void test_Given_NoConstructorParams_When_Creating_then_ShouldUseDefaultValues() {
        sut = new ApiException();

        assertEquals(HttpStatus.BAD_REQUEST, sut.getStatus());
        assertEquals("", sut.getErrorMessage());
    }

    @Test
    void test_Given_OnlyHttpStatus_When_Creating_then_ShouldUseDefaultErrorMessageAndProvidedHttpStatus() {
        HttpStatus status = HttpStatus.FORBIDDEN;

        sut = new ApiException(status);

        assertEquals(status, sut.getStatus());
        assertEquals("", sut.getErrorMessage());
    }

    @Test
    void test_Given_HttpStatusAndErrorMessage_When_Creating_then_ShouldUseProvidedParameters() {
        HttpStatus status = HttpStatus.FORBIDDEN;
        String errorMessage = "this is the error message";

        sut = new ApiException(status, errorMessage);

        assertEquals(status, sut.getStatus());
        assertEquals(errorMessage, sut.getErrorMessage());
    }


}