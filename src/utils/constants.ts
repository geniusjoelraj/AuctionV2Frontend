import { Player } from "@/types/api"

export const teams = ["CSK", "DC", "GT", "KKR", "LSG", "MI", "PBKS", "RR", "RCB", "SRH"]
export const mockPlayer: Player = {
  "id": 0,
  "name": "None",
  "imageLink": "rahul.jpg",
  "type": "BATSMAN",
  "isUncapped": true,
  "isLegend": false,
  "country": "IND",
  "batsmanStats": {
    "runs": 4500,
    "matches": 130,
    "battingAvg": 45.30,
    "strikeRate": 88.10
  },
  "bowlerStats": null,
  "allRounderStats": null,
  "setId": 1,
  "price": 12.50,
  "points": 850,
  "order": 1,
  "status": "FOR_SALE"
}
