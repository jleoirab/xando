package com.jleoirab.xando.router.websocket;

import com.google.protobuf.ExtensionRegistry;
import com.google.protobuf.Message;
import org.springframework.lang.Nullable;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.converter.AbstractMessageConverter;
import org.springframework.messaging.converter.MessageConversionException;
import org.springframework.util.ConcurrentReferenceHashMap;
import org.springframework.util.MimeType;

import java.io.IOException;
import java.lang.reflect.Method;
import java.util.Map;

/**
 * Created by jleoirab on 2021-03-28
 */
public class ProtobufMessageConverter extends AbstractMessageConverter {
    /**
     * The mime-type for protobuf {@code application/octet-stream}.
     */
    public static final MimeType PROTOBUF = new MimeType("application", "octet-stream");


    private static final Map<Class<?>, Method> methodCache = new ConcurrentReferenceHashMap<>();

    final ExtensionRegistry extensionRegistry;


    /**
     * Constructor with a default instance of {@link ExtensionRegistry}.
     */
    public ProtobufMessageConverter() {
        super(PROTOBUF);

        this.extensionRegistry = ExtensionRegistry.newInstance();
    }


    @Override
    protected boolean supports(Class<?> clazz) {
        return Message.class.isAssignableFrom(clazz);
    }

    @Override
    protected Object convertFromInternal(org.springframework.messaging.Message<?> message,
                                         Class<?> targetClass, @Nullable Object conversionHint) {

        MimeType contentType = getMimeType(message.getHeaders());
        final Object payload = message.getPayload();

        if (contentType == null) {
            contentType = PROTOBUF;
        }

        Message.Builder builder = getMessageBuilder(targetClass);
        try {
            if (PROTOBUF.isCompatibleWith(contentType)) {
                builder.mergeFrom((byte[]) payload, this.extensionRegistry);
            }
        }
        catch (IOException ex) {
            throw new MessageConversionException(message, "Could not read proto message" + ex.getMessage(), ex);
        }

        return builder.build();
    }


    @Override
    protected Object convertToInternal(
            Object payload, @Nullable MessageHeaders headers, @Nullable Object conversionHint) {

        final Message message = (Message) payload;

        MimeType contentType = getMimeType(headers);
        if (contentType == null) {
            contentType = PROTOBUF;
        }

        if (PROTOBUF.isCompatibleWith(contentType)) {
            payload = message.toByteArray();
        }

        return payload;
    }

    /**
     * Create a new {@code Message.Builder} instance for the given class.
     * <p>This method uses a ConcurrentReferenceHashMap for caching method lookups.
     */
    private Message.Builder getMessageBuilder(Class<?> clazz) {
        try {
            Method method = methodCache.get(clazz);
            if (method == null) {
                method = clazz.getMethod("newBuilder");
                methodCache.put(clazz, method);
            }
            return (Message.Builder) method.invoke(clazz);
        }
        catch (Exception ex) {
            throw new MessageConversionException(
                    "Invalid Protobuf Message type: no invocable newBuilder() method on " + clazz, ex);
        }
    }
}
