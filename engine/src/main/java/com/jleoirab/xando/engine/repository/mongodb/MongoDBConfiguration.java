package com.jleoirab.xando.engine.repository.mongodb;

import com.mongodb.MongoCredential;
import com.mongodb.client.MongoClient;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.MongoClientFactoryBean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;
import org.springframework.data.mongodb.core.convert.DbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

/**
 * Created by jleoirab on 2021-02-15
 */
@Configuration
@EnableMongoRepositories(basePackages = "com.jleoirab.xando.engine.repository.mongodb", mongoTemplateRef = "mongoOpsDatabaseTemplate")
public class MongoDBConfiguration {
    private static final String DATABASE_NAME = "xando";
    private static final String DATABASE_USER = "xando-db-user";
    private static final String DATABASE_PWD = "xando-db-pwd";
    private static final String DATABASE_HOST = "localhost";
    private static final int DATABASE_PORT = 27017;

    @Bean
    public MongoClientFactoryBean mongoOpsDatabaseClient() {
        MongoClientFactoryBean mongo = new MongoClientFactoryBean();
        mongo.setHost(DATABASE_HOST);
        mongo.setPort(DATABASE_PORT);
        mongo.setCredential(new MongoCredential[]{
                MongoCredential.createCredential(DATABASE_USER, DATABASE_NAME, DATABASE_PWD.toCharArray())
        });

        return mongo;
    }

    @Bean
    public MongoTemplate mongoOpsDatabaseTemplate(@Qualifier("mongoOpsDatabaseClient") MongoClient client) {
        MongoDatabaseFactory mongoDatabaseFactory = new SimpleMongoClientDatabaseFactory(client, DATABASE_NAME);
        DbRefResolver dbRefResolver = new DefaultDbRefResolver(mongoDatabaseFactory);
        MappingMongoConverter converter =
                new MappingMongoConverter(dbRefResolver, new MongoMappingContext());

        // Remove _class field.
        converter.setTypeMapper(new DefaultMongoTypeMapper(null));

        return new MongoTemplate(mongoDatabaseFactory, converter);
    }
}
