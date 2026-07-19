<?php

namespace Tests\Feature\Settings;

use Tests\TestCase;

class SecurityTest extends TestCase
{
    public function test_security_page_is_displayed(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }

    public function test_security_page_requires_password_confirmation_when_enabled(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }

    public function test_security_page_renders_without_two_factor_when_feature_is_disabled(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }

    public function test_password_can_be_updated(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }

    public function test_correct_password_must_be_provided_to_update_password(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }
}
