<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PartsTest extends TestCase
{

    /**
     * tests if index returns all parts
     */
    public function testPartIndex()
    {
        $response = $this->json('GET', '/api/parts');
        $response->assertStatus(200);
    }

    /**
     * test parts store method with correct data
     */
    public function testPartStoreWorking()
    {
        $part = array('type' => 'cpu', 'model' => 'test', 'specs' => 'test specs', 'image_url' => 'url');

        $response = $this->withHeader(
            'Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6OTBcL3NhaXR5bmFzcGNcL3B1YmxpY1wvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MTY1MTgwNCwiZXhwIjoxNTcxNjU1NDA0LCJuYmYiOjE1NzE2NTE4MDQsImp0aSI6InpsSHFNaWJjdm5DVlRnZjUiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.1Ctkan1MrHkt0eb62iMgcVjDykGSv-b3RRnrzhZukog'
            )->json('POST', "api/part", $part);
        $response->assertStatus(201);
    }

    /**
     * test parts store method without autorization
     */
    public function testPartStoreUnauthorized()
    {
        $part = array('type' => 'cpu', 'model' => 'test', 'specs' => 'test specs', 'image_url' => 'url');

        $response = $this->json('POST', "api/part", $part);
        $response->assertStatus(401);
    }

    /**
     * test parts store method with wrong data
     */
    public function testPartStoreWrongRequest()
    {
        $part = array('type' => 'cp1u', 'model' => 'test', 'specs' => 'test specs', 'image_url' => 'url');

        $response = $this->withHeader(
            'Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6OTBcL3NhaXR5bmFzcGNcL3B1YmxpY1wvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MTY1MTgwNCwiZXhwIjoxNTcxNjU1NDA0LCJuYmYiOjE1NzE2NTE4MDQsImp0aSI6InpsSHFNaWJjdm5DVlRnZjUiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.1Ctkan1MrHkt0eb62iMgcVjDykGSv-b3RRnrzhZukog'
            )->json('POST', "api/part", $part);
        $response->assertStatus(404);
    }

    /**
     * test parts show method with correct data
     */
    public function testPartShowWorking()
    {
        $response = $this->json('GET', "api/part/5");
        $response->assertStatus(200);
    }

    /**
     * test parts show method with wrong data
     */
    public function testPartShowNotFound()
    {
        $response = $this->json('GET', "api/part/500");
        $response->assertStatus(404);
    }


        /**
     * test parts showByType method with correct data
     */
    public function testPartShowByTypeWorking()
    {
        $response = $this->json('GET', "api/parts/cpu");
        $response->assertStatus(200);
    }

    /**
     * test parts showByType method with wrong data
     */
    public function testPartShowByTypeNotFound()
    {
        $response = $this->json('GET', "api/parts/cpu12");
        $response->assertStatus(404);
    }

    /**
     * test parts update method with correct data
     */
    public function testPartUpdateWorking()
    {
        $part = array('type' => 'cpu', 'model' => 'update', 'specs' => 'update specs', 'image_url' => 'update');

        $response = $this->withHeader(
            'Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6OTBcL3NhaXR5bmFzcGNcL3B1YmxpY1wvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MTY1MTgwNCwiZXhwIjoxNTcxNjU1NDA0LCJuYmYiOjE1NzE2NTE4MDQsImp0aSI6InpsSHFNaWJjdm5DVlRnZjUiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.1Ctkan1MrHkt0eb62iMgcVjDykGSv-b3RRnrzhZukog'
            )->json('PUT', "api/part/68", $part);
        $response->assertStatus(200);
    }

    /**
     * test parts update method without autorization
     */
    public function testPartUpdateUnauthorized()
    {
        $part = array('type' => 'cpu', 'model' => 'Unauthorized', 'specs' => 'Unauthorized specs', 'image_url' => 'Unauthorized');

        $response = $this->json('PUT', "api/part/68", $part);
        $response->assertStatus(401);
    }

    /**
     * test parts update method with wrong data
     */
    public function testPartUpdateWrongRequest()
    {
        $part = array('type' => 'cp1u', 'model' => 'Wrong', 'specs' => 'Wrong specs', 'image_url' => 'Wrong');

        $response = $this->withHeader(
            'Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6OTBcL3NhaXR5bmFzcGNcL3B1YmxpY1wvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MTY1MTgwNCwiZXhwIjoxNTcxNjU1NDA0LCJuYmYiOjE1NzE2NTE4MDQsImp0aSI6InpsSHFNaWJjdm5DVlRnZjUiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.1Ctkan1MrHkt0eb62iMgcVjDykGSv-b3RRnrzhZukog'
            )->json('PUT', "api/part/68", $part);
        $response->assertStatus(404);
    }

    /**
     * test parts update method for non existing object
     */
    public function testPartUpdateNotFound()
    {
        $part = array('type' => 'cpu', 'model' => 'test', 'specs' => 'test specs', 'image_url' => 'url');

        $response = $this->withHeader(
            'Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6OTBcL3NhaXR5bmFzcGNcL3B1YmxpY1wvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MTY1MTgwNCwiZXhwIjoxNTcxNjU1NDA0LCJuYmYiOjE1NzE2NTE4MDQsImp0aSI6InpsSHFNaWJjdm5DVlRnZjUiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.1Ctkan1MrHkt0eb62iMgcVjDykGSv-b3RRnrzhZukog'
            )->json('PUT', "api/part/700", $part);
        $response->assertStatus(404);
    }

        /**
     * test parts destroy method with correct data
     */
    public function testPartDestroyWorking()
    {
        $response = $this->withHeader(
            'Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6OTBcL3NhaXR5bmFzcGNcL3B1YmxpY1wvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MTY1MTgwNCwiZXhwIjoxNTcxNjU1NDA0LCJuYmYiOjE1NzE2NTE4MDQsImp0aSI6InpsSHFNaWJjdm5DVlRnZjUiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.1Ctkan1MrHkt0eb62iMgcVjDykGSv-b3RRnrzhZukog'
            )->json('DELETE', "api/part/74");
        $response->assertStatus(200);
    }

    /**
     * test parts destroy method without autorization
     */
    public function testPartDestroyUnauthorized()
    {
        $response = $this->json('DELETE', "api/part/77");
        $response->assertStatus(401);
    }

    /**
     * test parts destroy method for non existing object
     */
    public function testPartDestroyNotFound()
    {
        $response = $this->withHeader(
            'Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6OTBcL3NhaXR5bmFzcGNcL3B1YmxpY1wvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTU3MTY1MTgwNCwiZXhwIjoxNTcxNjU1NDA0LCJuYmYiOjE1NzE2NTE4MDQsImp0aSI6InpsSHFNaWJjdm5DVlRnZjUiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.1Ctkan1MrHkt0eb62iMgcVjDykGSv-b3RRnrzhZukog'
            )->json('DELETE', "api/part/700");
        $response->assertStatus(404);
    }


}
