<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Computer extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'motherboard_id' => $this->motherboard_id,
            'cpu_id' => $this->cpu_id,
            'ram_id' => $this->ram_id,
            'case_id' => $this->case_id,
            'psu_id' => $this->psu_id,
            'user_id' => $this->user_id,
            'image_url' => $this->image_url
        ];
    }
}
