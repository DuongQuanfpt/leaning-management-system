package swp490.g23.onlinelearningsystem.util;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

import org.springframework.stereotype.Component;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;

import swp490.g23.onlinelearningsystem.entities.auth.domain.request.GoogleAuthRequest;

@Component
public class GoogleHelper {
    public Payload getInfo(GoogleAuthRequest authRequest) throws GeneralSecurityException, IOException {
        NetHttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = new GsonFactory();
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .setAudience(Collections
                        .singletonList(authRequest.getClientId()))
                .build();
        GoogleIdToken idToken = verifier.verify(authRequest.getIdToken());
        
        Payload payload = idToken.getPayload();

        return payload;
    }
}
