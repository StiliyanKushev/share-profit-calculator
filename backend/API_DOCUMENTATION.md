<!-- Generator: Widdershins v4.0.1 -->

<h1 id="docs">Docs v0.0.1</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

This is the docs for this repo

Base URLs:

<h1 id="docs-authentication">authentication</h1>

## AuthenticationController_signUp

<a id="opIdAuthenticationController_signUp"></a>

`POST /authentication/sign-up`

> Body parameter

```json
{
  "type": "object",
  "properties": {
    "email": {
      "type": "string"
    },
    "password": {
      "type": "string",
      "minLength": 8
    }
  },
  "required": [
    "email",
    "password"
  ]
}
```

<h3 id="authenticationcontroller_signup-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SignUpDto](#schemasignupdto)|true|none|

<h3 id="authenticationcontroller_signup-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|successful user registration|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|dto is invalid or password is too short or email is invalid|None|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|user already exists|None|

<aside class="success">
This operation does not require authentication
</aside>

## AuthenticationController_signIn

<a id="opIdAuthenticationController_signIn"></a>

`POST /authentication/sign-in`

> Body parameter

```json
{
  "type": "object",
  "properties": {
    "email": {
      "type": "string"
    },
    "password": {
      "type": "string",
      "minLength": 8
    }
  },
  "required": [
    "email",
    "password"
  ]
}
```

<h3 id="authenticationcontroller_signin-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SignInDto](#schemasignindto)|true|none|

<h3 id="authenticationcontroller_signin-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful user login|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|dto is invalid or password does not match|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|user not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## AuthenticationController_refreshToken

<a id="opIdAuthenticationController_refreshToken"></a>

`POST /authentication/refresh-token`

> Body parameter

```json
{
  "type": "object",
  "properties": {
    "refreshToken": {
      "type": "string"
    }
  },
  "required": [
    "refreshToken"
  ]
}
```

<h3 id="authenticationcontroller_refreshtoken-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[RefreshTokenDto](#schemarefreshtokendto)|true|none|

<h3 id="authenticationcontroller_refreshtoken-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful token refresh|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|refresh token is not a valid jwt token or dto is invalid|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|refresh token is invalidated|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="docs-stocks">stocks</h1>

## StocksController_solve

<a id="opIdStocksController_solve"></a>

`POST /stocks/solve`

> Body parameter

```json
{
  "type": "object",
  "properties": {
    "startUnixTimestamp": {
      "type": "number",
      "minimum": 1
    },
    "endUnixTimestamp": {
      "type": "number",
      "minimum": 1
    },
    "funds": {
      "type": "number",
      "minimum": 1
    }
  },
  "required": [
    "startUnixTimestamp",
    "endUnixTimestamp",
    "funds"
  ]
}
```

<h3 id="stockscontroller_solve-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SolveDto](#schemasolvedto)|true|none|

<h3 id="stockscontroller_solve-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successfully found a solution|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|dto is invalid or dates are invalid or insufficient funds|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|access token has expired|None|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_SignUpDto">SignUpDto</h2>
<!-- backwards compatibility -->
<a id="schemasignupdto"></a>
<a id="schema_SignUpDto"></a>
<a id="tocSsignupdto"></a>
<a id="tocssignupdto"></a>

```json
{
  "type": "object",
  "properties": {
    "email": {
      "type": "string"
    },
    "password": {
      "type": "string",
      "minLength": 8
    }
  },
  "required": [
    "email",
    "password"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|true|none|none|
|password|string|true|none|none|

<h2 id="tocS_SignInDto">SignInDto</h2>
<!-- backwards compatibility -->
<a id="schemasignindto"></a>
<a id="schema_SignInDto"></a>
<a id="tocSsignindto"></a>
<a id="tocssignindto"></a>

```json
{
  "type": "object",
  "properties": {
    "email": {
      "type": "string"
    },
    "password": {
      "type": "string",
      "minLength": 8
    }
  },
  "required": [
    "email",
    "password"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|true|none|none|
|password|string|true|none|none|

<h2 id="tocS_RefreshTokenDto">RefreshTokenDto</h2>
<!-- backwards compatibility -->
<a id="schemarefreshtokendto"></a>
<a id="schema_RefreshTokenDto"></a>
<a id="tocSrefreshtokendto"></a>
<a id="tocsrefreshtokendto"></a>

```json
{
  "type": "object",
  "properties": {
    "refreshToken": {
      "type": "string"
    }
  },
  "required": [
    "refreshToken"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|refreshToken|string|true|none|none|

<h2 id="tocS_SolveDto">SolveDto</h2>
<!-- backwards compatibility -->
<a id="schemasolvedto"></a>
<a id="schema_SolveDto"></a>
<a id="tocSsolvedto"></a>
<a id="tocssolvedto"></a>

```json
{
  "type": "object",
  "properties": {
    "startUnixTimestamp": {
      "type": "number",
      "minimum": 1
    },
    "endUnixTimestamp": {
      "type": "number",
      "minimum": 1
    },
    "funds": {
      "type": "number",
      "minimum": 1
    }
  },
  "required": [
    "startUnixTimestamp",
    "endUnixTimestamp",
    "funds"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|startUnixTimestamp|number|true|none|none|
|endUnixTimestamp|number|true|none|none|
|funds|number|true|none|none|

