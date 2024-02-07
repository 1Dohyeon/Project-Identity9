# Project-Identity9

### Use

VScode

GitKraken( gitflow를 girhubflow처럼 사용(develop 브랜치 x) )

NodeJS

Typescript

NestJS

### API Setup

**nestjs 폴더 생성**

```
npm i -g @nestjs/cli
nest new project-name
```

```
npm i
```

**module, controller, service 생성**

```
nest g mo name
nest g co name
nest g service name
```

**mongoose, config 설치**

```
npm i --save @nestjs/mongoose mongoose
npm i --save @nestjs/config
```

**middleware 생성**

```
nest g middleware name
```

**class-validator 설치**

```
npm i --save class-validator class-transformer
```

**swagger 설치**

```
npm i --save @nestjs/swagger swagger-ui-express
```

**bcrypt 설치**

```
npm install bcrypt
```

적용

```ts
import * as bcrypt from "bcrypt";
```

**jwt passport 설치**

```
npm i --save @nestjs/passport passport
npm i --save @nestjs/jwt passport-jwt
npm i --save-dev @types/passport-jwt
```

### UI Setup

```
npm i react-dom
```

### prettier/prettier rule

```
'prettier/prettier': [
    'error',
    {
        endOfLine: 'auto',
    },
],
```
