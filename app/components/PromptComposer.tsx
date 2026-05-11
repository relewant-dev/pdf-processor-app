import { IconButton } from "./IconButton";
import { MicrophoneIcon, PlusIcon, VoiceWaveIcon } from "./icons";
import { ModeSelector } from "./ModeSelector";
import { TextInput } from "./TextInput";

export function PromptComposer() {
  return (
    <form className="prompt-composer" aria-label="Assistant prompt composer">
      <IconButton label="Add attachment">
        <PlusIcon className="prompt-icon" />
      </IconButton>

      <TextInput label="Prompt" placeholder="Ask anything" />

      <div className="prompt-actions" aria-label="Prompt actions">
        <ModeSelector value="Instant" aria-label="Response mode: Instant" />
        <IconButton label="Use microphone">
          <MicrophoneIcon className="prompt-icon prompt-icon--microphone" />
        </IconButton>
        <IconButton label="Start voice mode" variant="filled">
          <VoiceWaveIcon className="prompt-icon" />
        </IconButton>
      </div>
    </form>
  );
}
