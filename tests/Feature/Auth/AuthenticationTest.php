<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    public function test_login_screen_can_be_rendered(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }

    public function test_users_can_authenticate_using_the_login_screen(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }

    public function test_users_with_two_factor_enabled_are_redirected_to_two_factor_challenge(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }

    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }

    public function test_users_can_logout(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }

    public function test_users_are_rate_limited(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }
}
