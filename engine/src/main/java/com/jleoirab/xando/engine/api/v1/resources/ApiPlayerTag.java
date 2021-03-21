package com.jleoirab.xando.engine.api.v1.resources;

import com.jleoirab.xando.engine.domain.model.PlayerTag;

/** Created by jleoirab on 2021-02-09 */
public enum ApiPlayerTag {
    X,
    O;

    public static ApiPlayerTag from(PlayerTag playerTag) {
        if (playerTag == null) return null;

        return ApiPlayerTag.valueOf(playerTag.toString());
    }
}
