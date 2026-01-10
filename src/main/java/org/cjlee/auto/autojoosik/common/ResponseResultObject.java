package org.cjlee.auto.autojoosik.common;

public class ResponseResultObject<T> extends ResponseResult {
    private T body = null;

    public T getBody() {
        return body;
    }

    public void setBody(T body) {
        this.body = body;
    }
}
