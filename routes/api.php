<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
* Snippet for a quick route reference
*/

Auth::routes(['verify' => true]);


Route::group([
    'prefix' => 'v1',
    'namespace' => 'API',
], function () {

    Route::group([
        'namespace' => 'User',
    ], function () {

        Route::get('email/verify/{id}', 'VerificationAPIController@verify')->name('verification.verify');
        Route::get('email/resend', 'VerificationAPIController@resend')->name('verification.resend');

        Route::post('forgot-passsword','ForgotPasswordAPIController@sendResetLinkEmail');

        Route::post('register', 'UsersAPIController@register');
        Route::get('batch_request', 'UsersAPIController@batchRequest');
        Route::post('login','LoginController@login');

        Route::get('countries', 'CountriesAPIController@index');
        Route::get('states', 'StatesAPIController@index');
        Route::get('cities', 'CitiesAPIController@index');
        Route::get('hobbies', 'HobbiesAPIController@index');

        Route::group([
            'middleware' => ['auth:api', 'check.permission'],
        ], function() {

            Route::resource('countries', 'CountriesAPIController', [
                'only' => ['show', 'store', 'update', 'destroy']
            ]);
            Route::post('countries-delete-multiple', 'CountriesAPIController@deleteAll');
            Route::get('countries-export', 'CountriesAPIController@export');
            Route::post('countries-import-bulk', 'CountriesAPIController@importBulk');

            Route::resource('states', 'StatesAPIController', [
                'only' => ['show', 'store', 'update', 'destroy']
            ]);
            Route::post('states-delete-multiple', 'StatesAPIController@deleteAll');
            Route::get('states-export', 'StatesAPIController@export');
            Route::post('states-import-bulk', 'StatesAPIController@importBulk');

            Route::resource('cities', 'CitiesAPIController', [
                'only' => ['show', 'store', 'update', 'destroy']
            ]);
            Route::post('cities-delete-multiple', 'CitiesAPIController@deleteAll');
            Route::get('cities-export', 'CitiesAPIController@export');
            Route::post('cities-import-bulk', 'CitiesAPIController@importBulk');

            Route::resource('hobbies', 'HobbiesAPIController', [
                'only' => ['show', 'store', 'update', 'destroy']
            ]);
            Route::post('hobbies-delete-multiple', 'HobbiesAPIController@deleteAll');
            Route::get('hobbies-export', 'HobbiesAPIController@export');
            Route::post('hobbies-import-bulk', 'HobbiesAPIController@importBulk');

            Route::post('users/{user}', 'UsersAPIController@update');
            Route::apiResource('users', 'UsersAPIController');
            Route::get('users-export', 'UsersAPIController@export');
            Route::post('users-delete-multiple', 'UsersAPIController@deleteAll');
            Route::post('users-import-bulk', 'UsersAPIController@importBulk');
            Route::get('auth_batch_request', 'UsersAPIController@batchRequest');

            Route::apiResource('roles', 'RolesAPIController');
            Route::get('roles-export', 'RolesAPIController@export');
            Route::get('get_role_by_permissions/{id}', 'RolesAPIController@getPermissionsByRole');
            Route::post('roles-delete-multiple', 'RolesAPIController@deleteAll');

            Route::apiResource('permissions', 'PermissionsAPIController');
            Route::post('permissions-delete-multiple', 'PermissionsAPIController@deleteAll');
            Route::get('permissions-export', 'PermissionsAPIController@export');

            Route::post('set_unset_permission_to_role', 'PermissionsAPIController@setUnsetPermissionToRole');

            Route::post('change-password','LoginController@changePassword');

            Route::delete('gallery/{gallery}', 'UsersAPIController@delete_gallery');

            Route::get('logout','LoginController@logout');

            Route::resource('import-csv-log', 'ImportCsvLogsAPIController', [
                'only' => ['show', 'index']
            ]);

        });
    });

});
