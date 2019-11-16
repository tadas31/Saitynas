<?php

namespace App\Http\Resources;



use Illuminate\Support\Facades\Hash;



use Illuminate\Http\Resources\Json\JsonResource;

class Part extends JsonResource
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
            'type' => $this->type,
            'model' => $this->model,
            'specs' => $this->specs,
            'image_url' => $this->image_url
        ];
    }
}
