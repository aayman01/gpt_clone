"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Sparkles, Sun, Moon, Plus, MessageSquare, Settings, User, LogOut } from "lucide-react"
import { useChat } from "ai/react"
import { Card } from "@/components/ui/card"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

export default function ChatPage() {
  const [darkMode, setDarkMode] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const [activeChat, setActiveChat] = useState("New chat")

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const chatHistory = [
    { id: 1, title: "Next.js Project Setup", date: "3/4/2025" },
    { id: 2, title: "React Component Design", date: "3/3/2025" },
    { id: 3, title: "Tailwind CSS Tips", date: "3/2/2025" },
  ]

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
      <div className="flex-1 flex bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <SidebarProvider>
          <Sidebar className="border-r border-gray-200 dark:border-gray-800">
            <SidebarHeader className="px-3 py-2">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    size="lg"
                    className="w-full justify-start gap-2"
                    onClick={() => setActiveChat("New chat")}
                  >
                    <div className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      <span>New chat</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Recent chats</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {chatHistory.map((chat) => (
                      <SidebarMenuItem key={chat.id}>
                        <SidebarMenuButton
                          className="w-full justify-start gap-2"
                          isActive={activeChat === chat.title}
                          onClick={() => setActiveChat(chat.title)}
                        >
                          <MessageSquare className="h-4 w-4 shrink-0" />
                          <div className="flex flex-col items-start">
                            <span className="text-sm truncate">{chat.title}</span>
                            <span className="text-xs text-muted-foreground">{chat.date}</span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup className="mt-auto">
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton className="w-full justify-start gap-2">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton className="w-full justify-start gap-2">
                        <User className="h-4 w-4" />
                        <span>Account</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton className="w-full justify-start gap-2 text-destructive">
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
          </Sidebar>

          <SidebarInset className="flex flex-col flex-1">
            {/* Header */}
            <header className="border-b border-gray-200 dark:border-gray-800">
              <div className="px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="h-4" />
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{activeChat}</h1>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleDarkMode}
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
            </header>

            {/* Chat Container */}
            <div className="flex-1 px-4 py-6 overflow-auto">
              <div className="max-w-3xl mx-auto">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                    <Sparkles className="h-12 w-12 text-primary mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      How can I help you today?
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md">
                      Ask me anything and I&apos;ll do my best to assist you.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <Card
                          className={`px-4 py-3 max-w-[80%] ${
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </Card>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <Card className="px-4 py-3 bg-muted">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" />
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]" />
                          </div>
                        </Card>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-colors duration-200">
              <div className="px-4 py-4">
                <div className="max-w-3xl mx-auto">
                  <form onSubmit={handleSubmit} className="relative">
                    <Textarea
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Message..."
                      className="pr-12 resize-none min-h-[60px] max-h-[200px] py-3 dark:bg-gray-900"
                      rows={1}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSubmit(e)
                        }
                      }}
                    />
                    <Button
                      className="absolute right-2 bottom-2"
                      size="icon"
                      type="submit"
                      disabled={isLoading || !input.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    AI may produce inaccurate information about people, places, or facts.
                  </p>
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  )
}

