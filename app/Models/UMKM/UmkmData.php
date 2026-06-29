<?php

namespace App\Models\UMKM;

use Illuminate\Database\Eloquent\Model;

class UmkmData extends Model
{
    public const STATUS_UNVERIFIED = 'UNVERIFIED';
    public const STATUS_PENDING = 'PENDING';
    public const STATUS_VERIFIED = 'VERIFIED';
    public const STATUS_REJECT = 'REJECT';

    protected $table = 'umkm_datas';
    protected $fillable = [
        'umkm_id',
        'owner_name',
        'npwp',
        'nib',
        'nik',
        'image_hash',
        'file_path',
        'is_verified',
    ];

    protected function casts(): array
    {
        return [
            'is_verified' => 'string',
        ];
    }

    public function umkm() {
        return $this->belongsTo(Umkm::class, 'umkm_id');
    }
}
