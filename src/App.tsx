import { useState } from "react"

interface FieldProps {
  label: string
  placeholder: string
  onEnter: () => void
  onChange: (v: string) => void
}

function Field(props: FieldProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      props.onEnter()
      e.currentTarget.value = ""
    }
  }

  return (
    <div className="mt-2">
      <div>
        <label>{props.label}</label>
      </div>
      <input
        type="number"
        className="bg-gray-800 rounded p-2"
        placeholder={props.placeholder}
        onKeyDown={handleKeyDown}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  )
}

export function App() {
  const [valor, setValor] = useState<number>()
  const [resultado, setResultado] = useState<string>("")
  const [soma, setSoma] = useState<number>(0)

  const calc = () => {
    if (valor) {
      const newSoma = soma + valor
      setSoma(newSoma)

      setResultado(
        resultado
          ? `${resultado} + ${valor}`
          : `Soma é: ${valor}`
      )

      setValor(undefined)
    }
  };

  const limparResult = () => {
    setResultado("")
    setSoma(0)
  }

  return (
    <div className="bg-gray-950 flex text-white flex-col justify-center items-center w-[100vw] h-[100vh] p-4">
      <h1 className="text-center w-full font-bold">CALCULADORA SOMA</h1>

      <div className="calc-container bg-gray-900 mt-4 p-2 rounded">
        <Field
          label="Valor: "
          placeholder="insira um valor"
          onChange={(v) => setValor(Number(v))}
          onEnter={calc}
        />

        <button className="bg-gray-600 mt-4 p-2 rounded" onClick={calc}>
          Adicionar
        </button>
        <button className="bg-red-500 ml-2 mt-3 p-2 rounded" onClick={limparResult}>
          Limpar
        </button>

        {!!resultado && <h2>{resultado} = {soma}</h2>}
      </div>
    </div>
  );
}
