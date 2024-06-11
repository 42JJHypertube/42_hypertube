export type TorrentInfo = {
  url: string
  hash: string
  quality: string
  type: string
  is_repack: string
  video_codec: string
  bit_depth: string
  audio_channels: string
  seeds: number
  peers: number
  size: string
  size_bytes: number
  date_uploaded: string
  date_uploaded_unix: number
}

function parseQuality(quality: string): number {
  const match = quality.match(/(\d+)/)
  return match ? parseInt(match[1], 10) : 0
}

function getSortedTorrent({ torrents }: { torrents: TorrentInfo[] }) {
  const filteredTorrents = torrents.filter(
    (info) => parseQuality(info.quality) < 2160,
  )
  const sortedTorrents = filteredTorrents.sort((a, b) => {
    const qualityA = parseQuality(a.quality)
    const qualityB = parseQuality(b.quality)

    if (qualityA > qualityB) return -1
    if (qualityA < qualityB) return 1

    // Quality가 같을 때 seed 수로 내림차순 정렬
    if (a.seeds < b.seeds) return -1
    if (a.seeds > b.seeds) return 1

    return 0
    // magnet:?xt=urn:btih:E0D00667650ABA9EE05AACBBBD8B55EA8A51F534&dn=The+Shawshank+Redemption+%281994%29+%5B1080p%5D+%5BYTS.MX%5D&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.tracker.cl%3A1337%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=https%3A%2F%2Fopentracker.i2p.rocks%3A443%2Fannounce
  })

  return sortedTorrents[0]
}

export default getSortedTorrent
