export default function ToggleSwitch({ isChecked, onChange }) {
  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="toggle-switch__input"
      />
      <span className="toggle-switch__slider"></span>
    </label>
  );
}