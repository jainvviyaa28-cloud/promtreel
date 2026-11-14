# Promptreel (real AI video)

1. Make a Replicate account and copy your API token (replicate.com/account/api-tokens).
2. Push this folder to GitHub, then "Import project" on Netlify (netlify.com).
3. In Netlify > Site settings > Environment variables add:
   - REPLICATE_API_TOKEN = your token
   - REPLICATE_MODEL = owner/name of a text-to-video model from replicate.com/collections/text-to-video (default google/veo-3-fast; check it exists and its price)
   - REPLICATE_EXTRA_INPUT (optional) = JSON of extra model inputs, e.g. {"duration":8,"aspect_ratio":"16:9"}
4. Deploy. Set "Seconds per shot" in the page to your model's clip length.

Length has no cap in the app. Your Replicate spend and rate limits are the real limit; set a spending limit in Replicate.
