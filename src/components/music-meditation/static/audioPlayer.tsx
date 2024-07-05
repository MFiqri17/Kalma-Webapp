'use client'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/src/styles.scss'
import './audioPlayer.scss'

export default function AudioPlayerComponent({ music_link }: { music_link: string }) {
	return <AudioPlayer customAdditionalControls={[]} src={music_link} />
}
