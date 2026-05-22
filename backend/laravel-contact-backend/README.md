# Laravel Contact Backend

This folder contains the Laravel files needed to handle the portfolio contact form.

## Create The Laravel App

From `D:\websites\sandeepPortfolio\portfolio-master\backend`:

```powershell
composer create-project laravel/laravel contact-api
```

Then copy the files from this starter into the new Laravel app:

```text
app/Models/ContactMessage.php
app/Http/Controllers/ContactMessageController.php
database/migrations/2026_05_23_000000_create_contact_messages_table.php
routes/api.php
config/cors.php
```

## Configure `.env`

Use your database settings, then add mail settings:

```env
APP_URL=http://127.0.0.1:8000
FRONTEND_URL=http://127.0.0.1:4173

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your_email@gmail.com
MAIL_FROM_NAME="Sandeep Portfolio"

CONTACT_TO_EMAIL=Sandipmeche6@gmail.com
```

For Gmail, use an app password instead of your normal Gmail password.

## Run

```powershell
php artisan migrate
php artisan serve --host=127.0.0.1 --port=8000
```

The portfolio form posts to:

```text
http://127.0.0.1:8000/api/contact
```

If Laravel is not running, the frontend opens a pre-filled email draft as a fallback.
