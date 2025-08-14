<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {{-- <base href="http://localhost:8000/"> --}}
    <meta name="theme-color" content="#00EAFF" />
    <link rel="apple-touch-icon" href="{{ asset('/icon.png') }}">
    <link rel="manifest" href="{{ asset('/manifest.json') }}">

    <title inertia>{{ config('app.name', 'Siakrabkotabaru') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
    <style>
        /* NOTE: Typical mobile logical widths are ~360–430px. We lock at 420px for consistent mobile look on desktop. */
        .app-container {
            max-width: 420px; /* lock to mobile width even on desktop */
            width: 100%;       /* fill small screens */
            margin: 0 auto;    /* center on wider screens */
            padding: 0 auto;   /* horizontal breathing room */
            background: #fff;  /* optional, keeps content on white card */
            min-height: 100dvh;/* full viewport height on mobile */
        }

        /* Allow sections that need to be full-bleed */
        .full-bleed {
            width: 100vw;
            margin-left: 50%;
            transform: translateX(-50%);
        }

    </style>
</head>

<body class="antialiased">
    <div class="app-container">
        @inertia
    </div>

    <script>
        const global = globalThis;
    </script>

    <script src="{{ asset('/sw.js') }}"></script>
    <script>
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/sw.js").then(
                (registration) => {
                    console.log("Service worker registration succeeded:", registration);
                },
                (error) => {
                    console.error(`Service worker registration failed: ${error}`);
                },
            );
        } else {
            console.error("Service workers are not supported.");
        }
    </script>
</body>

</html>
