import LoginButton from "@/components/login-button";

export default function App() {
  return (
    <LoginButton
      disabled={false}
      onPress={() => console.log('Login button pressed')}
    />
  )
}