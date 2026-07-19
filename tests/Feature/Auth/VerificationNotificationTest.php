<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;

class VerificationNotificationTest extends TestCase
{
    public function test_sends_verification_notification(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }

    public function test_does_not_send_verification_notification_if_email_is_verified(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }
}
