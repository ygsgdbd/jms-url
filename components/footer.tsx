export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          <span className="font-medium">安全声明：</span>
          本工具完全在浏览器端运行，不会保存或上传您的订阅链接。您可以放心使用，甚至可以断网使用。
        </p>
      </div>
    </footer>
  )
} 