<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;

class EmailVerificationTest extends TestCase
{
    public function test_email_verification_screen_can_be_rendered(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }

    public function test_email_can_be_verified(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }

    public function test_email_is_not_verified_with_invalid_hash(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }

    public function test_email_is_not_verified_with_invalid_user_id(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }

    public function test_verified_user_is_redirected_to_dashboard_from_verification_prompt(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }

    public function test_already_verified_user_visiting_verification_link_is_redirected_without_firing_event_again(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }
}
