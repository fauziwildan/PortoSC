<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;

class PasswordConfirmationTest extends TestCase
{
    public function test_confirm_password_screen_can_be_rendered(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }

    public function test_password_confirmation_requires_authentication(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }
}
