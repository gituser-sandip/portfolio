<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactMessageController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:160'],
            'subject' => ['required', 'string', 'max:180'],
            'message' => ['required', 'string', 'max:3000'],
        ]);

        $message = ContactMessage::create([
            ...$validated,
            'ip_address' => $request->ip(),
            'user_agent' => (string) $request->userAgent(),
        ]);

        $to = config('mail.contact_to', env('CONTACT_TO_EMAIL', 'Sandipmeche6@gmail.com'));

        Mail::raw($this->formatEmailBody($message), function ($mail) use ($message, $to) {
            $mail->to($to)
                ->replyTo($message->email, $message->name)
                ->subject('Portfolio contact: ' . $message->subject);
        });

        return response()->json([
            'message' => 'Message sent successfully.',
        ], 201);
    }

    private function formatEmailBody(ContactMessage $message): string
    {
        return implode("\n", [
            'New portfolio message',
            '',
            'Name: ' . $message->name,
            'Email: ' . $message->email,
            'Subject: ' . $message->subject,
            '',
            'Message:',
            $message->message,
            '',
            'IP: ' . $message->ip_address,
            'User Agent: ' . $message->user_agent,
        ]);
    }
}
