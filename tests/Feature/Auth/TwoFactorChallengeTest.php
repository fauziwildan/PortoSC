<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;

class TwoFactorChallengeTest extends TestCase
{
    public function test_two_factor_challenge_redirects_to_login_when_not_authenticated(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }

    public function test_two_factor_challenge_can_be_rendered(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }
}
