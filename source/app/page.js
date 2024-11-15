import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Twitter, Linkedin, Github } from 'lucide-react';

export default function EmailSignatureGenerator() {
  const [formData, setFormData] = useState({
    name: 'John Smith',
    title: 'Senior Product Manager',
    company: 'Acme Corporation',
    email: 'john.smith@acme.com',
    phone: '+1 (555) 123-4567',
    website: 'www.acme.com',
    linkedin: '',
    twitter: '',
    github: '',
    accentColor: '#0066cc'
  });

  const [style, setStyle] = useState('modern');

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const signatures = {
    modern: (data) => `
      <table cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; max-width: 500px">
        <tr>
          <td style="padding-bottom: 10px">
            <div style="font-size: 18px; font-weight: bold; color: #333">${data.name}</div>
            <div style="font-size: 14px; color: #666">${data.title}</div>
            <div style="font-size: 14px; font-weight: bold; color: ${data.accentColor}">${data.company}</div>
          </td>
        </tr>
        <tr>
          <td style="border-top: 2px solid ${data.accentColor}; padding: 10px 0;"></td>
        </tr>
        <tr>
          <td style="font-size: 14px; color: #666">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom: 5px">
                  <a href="mailto:${data.email}" style="color: ${data.accentColor}; text-decoration: none">${data.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom: 5px">${data.phone}</td>
              </tr>
              <tr>
                <td style="padding-bottom: 10px">
                  <a href="https://${data.website}" style="color: ${data.accentColor}; text-decoration: none">${data.website}</a>
                </td>
              </tr>
              ${data.linkedin || data.twitter || data.github ? `
                <tr>
                  <td>
                    ${data.linkedin ? `<a href="${data.linkedin}" style="color: ${data.accentColor}; text-decoration: none; margin-right: 10px">LinkedIn</a>` : ''}
                    ${data.twitter ? `<a href="${data.twitter}" style="color: ${data.accentColor}; text-decoration: none; margin-right: 10px">Twitter</a>` : ''}
                    ${data.github ? `<a href="${data.github}" style="color: ${data.accentColor}; text-decoration: none">GitHub</a>` : ''}
                  </td>
                </tr>
              ` : ''}
            </table>
          </td>
        </tr>
      </table>
    `,
    minimal: (data) => `
      <table cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; max-width: 400px">
        <tr>
          <td style="padding-right: 15px; border-right: 1px solid #ddd">
            <div style="font-weight: bold; color: #333">${data.name}</div>
            <div style="font-size: 12px; color: #666">${data.title} | ${data.company}</div>
          </td>
          <td style="padding-left: 15px; font-size: 12px; color: #666">
            <a href="mailto:${data.email}" style="color: ${data.accentColor}; text-decoration: none">${data.email}</a><br>
            ${data.phone}<br>
            <a href="https://${data.website}" style="color: ${data.accentColor}; text-decoration: none">${data.website}</a>
          </td>
        </tr>
      </table>
    `,
    classic: (data) => `
      <table cellpadding="0" cellspacing="0" style="font-family: Times New Roman, serif; max-width: 500px">
        <tr>
          <td style="padding-bottom: 15px">
            <div style="font-size: 16px; font-weight: bold">${data.name}</div>
            <div style="font-style: italic">${data.title}</div>
            <div>${data.company}</div>
            <br>
            <div>
              Email: <a href="mailto:${data.email}" style="color: ${data.accentColor}">${data.email}</a><br>
              Tel: ${data.phone}<br>
              Web: <a href="https://${data.website}" style="color: ${data.accentColor}">${data.website}</a>
            </div>
            ${data.linkedin || data.twitter || data.github ? `
              <br>
              <div>
                ${data.linkedin ? `<a href="${data.linkedin}" style="color: ${data.accentColor}; margin-right: 10px">LinkedIn</a>` : ''}
                ${data.twitter ? `<a href="${data.twitter}" style="color: ${data.accentColor}; margin-right: 10px">Twitter</a>` : ''}
                ${data.github ? `<a href="${data.github}" style="color: ${data.accentColor}">GitHub</a>` : ''}
              </div>
            ` : ''}
          </td>
        </tr>
      </table>
    `
  };

  const copySignature = async () => {
    try {
      await navigator.clipboard.writeText(signatures[style](formData));
      alert('Signature HTML copied to clipboard!');
    } catch (err) {
      alert('Failed to copy signature');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Email Signature Generator</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="social">Social</TabsTrigger>
                  <TabsTrigger value="style">Style</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input 
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Job Title</Label>
                    <Input 
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Company</Label>
                    <Input 
                      value={formData.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Email</Label>
                    <Input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Phone</Label>
                    <Input 
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Website</Label>
                    <Input 
                      value={formData.website}
                      onChange={(e) => handleChange('website', e.target.value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="social" className="space-y-4">
                  <div>
                    <Label>LinkedIn URL</Label>
                    <Input 
                      value={formData.linkedin}
                      onChange={(e) => handleChange('linkedin', e.target.value)}
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>

                  <div>
                    <Label>Twitter URL</Label>
                    <Input 
                      value={formData.twitter}
                      onChange={(e) => handleChange('twitter', e.target.value)}
                      placeholder="https://twitter.com/..."
                    />
                  </div>

                  <div>
                    <Label>GitHub URL</Label>
                    <Input 
                      value={formData.github}
                      onChange={(e) => handleChange('github', e.target.value)}
                      placeholder="https://github.com/..."
                    />
                  </div>
                </TabsContent>

                <TabsContent value="style" className="space-y-4">
                  <div>
                    <Label>Template Style</Label>
                    <Select value={style} onValueChange={setStyle}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="classic">Classic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Accent Color</Label>
                    <Input 
                      type="color"
                      value={formData.accentColor}
                      onChange={(e) => handleChange('accentColor', e.target.value)}
                      className="h-10"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <Button onClick={copySignature} className="w-full">
                Copy Signature HTML
              </Button>
            </div>

            <div className="border rounded-lg p-4 bg-white">
              <h3 className="font-semibold mb-4">Preview</h3>
              <div 
                dangerouslySetInnerHTML={{ __html: signatures[style](formData) }} 
                className="signature-preview"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}