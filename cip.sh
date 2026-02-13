ZONE_ID="c09232793ef12b2c4eca47cc761ba1ea"
CLOUDFLARE_API_TOKEN="JTr_P3qbNgNxrEi2SIVRGCw7wVhZthhjzAzudz9kJTr_P3qbNgNxrEi2SIVRGCw7wVhZthhjzAzudz9k"
# DNS_RECORD_ID=
curl -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json"

# curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$DNS_RECORD_ID \
#   -X PUT \
#   -H 'Content-Type: application/json' \
#   -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
#   -d '{
#           "name": "auction",
#           "ttl": 3600,
#           "type": "A",
#           "comment": "Auction domain",
#           "content": "192.168.29.56",
#           "proxied": false
#         }'
