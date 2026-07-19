<?php

namespace Tests\Feature;

use Tests\TestCase;

class DashboardTest extends TestCase
{
    public function test_guests_are_redirected_to_the_login_page(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }

    public function test_authenticated_users_can_visit_the_dashboard(): void
    {
        $this->markTestSkipped('Authentication removed.');
    }
}
