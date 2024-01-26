# Project-Identity9

### Use

VScode

GitKraken( gitflow를 girhubflow처럼 사용(develop 브랜치 x) )

NodeJS

Typescript

NestJS

### Setup

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

### prettier/prettier rule

```
'prettier/prettier': [
    'error',
    {
        endOfLine: 'auto',
    },
],
```
