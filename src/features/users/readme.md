# Routes entity Profile

### this routes required authentication bearer token

| METHOD | PATH               | DESCRIPTION               |
| ------ | ------------------ | ------------------------- |
| POST   | /finalPost         | upload image from post x  |
| PUT    | /referralGenerated | create point from wallet  |
| PUT    | /calculatedVam     | create point from wallet  |
| GET    | /vam               | get vam value from wallet |

### POST /finalPost

```json
"file": File
```

### this routes publics

| METHOD | PATH               | DESCRIPTION              |
| ------ | ------------------ | ------------------------ |
| GET    | /:wallet/html      | render html from wallet  |
| GET    | /avatar?wallet=xyz | get avatar from wallet   |
| POST   | /avatar            | get avatars from wallets |

### POST /avatar

```json
"wallets": [""]
```
